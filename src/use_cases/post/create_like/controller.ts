import { Request, Response } from "express";
import { CreateLikeDtoConverter } from "./dto";
import { CreateLikeUseCase } from "./usecase";
import { CreateLikeRequest } from "./request";
import { CreateLikeValidator } from "./validator";

export class CreateLikeController {
  private createLikeUseCase: CreateLikeUseCase;

  constructor(createLikeUseCase: CreateLikeUseCase) {
    this.createLikeUseCase = createLikeUseCase;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const requestData = req.body as unknown as CreateLikeRequest;

      // Validate Request
      const validator = new CreateLikeValidator(requestData);
      const errors = validator.parseRequest();
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      // Convert DTO
      const dtoObject = new CreateLikeDtoConverter(requestData);

      // Execute Use Case
      const result = await this.createLikeUseCase.execute(
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
    console.error("CreateLikeController Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  execute() {
    return (req: Request, res: Response) => this.handle(req, res);
  }
}
