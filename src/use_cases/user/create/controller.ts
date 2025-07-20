import { Request, Response } from "express";
import { CreateUserDtoConverter } from "./dto";
import { CreateUserUseCase } from "./usecase";
import { CreateUserRequest } from "./request";
import { CreateUserValidator } from "./validator";

export class CreateUserController {
  private createUserUseCase: CreateUserUseCase;

  constructor(createUserUseCase: CreateUserUseCase) {
    this.createUserUseCase = createUserUseCase;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const requestData = req.body as unknown as CreateUserRequest;

      // Validate Request
      const validator = new CreateUserValidator(requestData);
      const errors = validator.parseRequest();
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      // Convert DTO
      const dtoObject = new CreateUserDtoConverter(requestData);

      // Execute Use Case
      const result = await this.createUserUseCase.execute(
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
    console.error("CreateUserController Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  execute() {
    return (req: Request, res: Response) => this.handle(req, res);
  }
}
