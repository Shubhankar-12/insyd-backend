import { Request, Response } from "express";
import { GetUserDtoConverter } from "./dto";
import { GetUserUseCase } from "./usecase";
import { GetUserRequest } from "./request";
import { GetUserValidator } from "./validator";

export class GetUserController {
  private getAllUserUseCase: GetUserUseCase;

  constructor(getAllUserUseCase: GetUserUseCase) {
    this.getAllUserUseCase = getAllUserUseCase;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const requestData = req.query as unknown as GetUserRequest;

      // Validate Request
      const validator = new GetUserValidator(requestData);
      const errors = validator.parseRequest();
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      // Convert DTO
      const dtoObject = new GetUserDtoConverter(requestData);

      // Execute Use Case
      const result = await this.getAllUserUseCase.execute(
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
    console.error("GetUserController Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  execute() {
    return (req: Request, res: Response) => this.handle(req, res);
  }
}
