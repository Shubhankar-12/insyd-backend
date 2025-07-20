import { Request, Response } from "express";
import { CreatePostDtoConverter } from "./dto";
import { CreatePostUseCase } from "./usecase";
import { CreatePostRequest } from "./request";
import { CreatePostValidator } from "./validator";

export class CreatePostController {
  private createPostUseCase: CreatePostUseCase;

  constructor(createPostUseCase: CreatePostUseCase) {
    this.createPostUseCase = createPostUseCase;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const requestData = req.body as unknown as CreatePostRequest;

      // Validate Request
      const validator = new CreatePostValidator(requestData);
      const errors = validator.parseRequest();
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      // Convert DTO
      const dtoObject = new CreatePostDtoConverter(requestData);

      // Execute Use Case
      const result = await this.createPostUseCase.execute(
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
    console.error("CreatePostController Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  execute() {
    return (req: Request, res: Response) => this.handle(req, res);
  }
}
