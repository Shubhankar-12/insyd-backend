import { Request, Response } from "express";
import { CreateCommentDtoConverter } from "./dto";
import { CreateCommentUseCase } from "./usecase";
import { CreateCommentRequest } from "./request";
import { CreateCommentValidator } from "./validator";

export class CreateCommentController {
  private createCommentUseCase: CreateCommentUseCase;

  constructor(createCommentUseCase: CreateCommentUseCase) {
    this.createCommentUseCase = createCommentUseCase;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const requestData = req.body as unknown as CreateCommentRequest;

      // Validate Request
      const validator = new CreateCommentValidator(requestData);
      const errors = validator.parseRequest();
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      // Convert DTO
      const dtoObject = new CreateCommentDtoConverter(requestData);

      // Execute Use Case
      const result = await this.createCommentUseCase.execute(
        dtoObject.getDtoObject()
      );

      if (typeof result === "object" && "error" in result) {
        res.status(400).json({ error: result.error });
        return;
      }

      res.status(200).json(result);
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: any): void {
    console.error("CreateCommentController Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  execute() {
    return (req: Request, res: Response) => this.handle(req, res);
  }
}
