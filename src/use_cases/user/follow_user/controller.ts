import { Request, Response } from "express";
import { FollowUserDtoConverter } from "./dto";
import { FollowUserUseCase } from "./usecase";
import { FollowUserRequest } from "./request";
import { FollowUserValidator } from "./validator";

export class FollowUserController {
  private followUserUseCase: FollowUserUseCase;

  constructor(followUserUseCase: FollowUserUseCase) {
    this.followUserUseCase = followUserUseCase;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const requestData = req.body as unknown as FollowUserRequest;

      // Validate Request
      const validator = new FollowUserValidator(requestData);
      const errors = validator.parseRequest();
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      // Convert DTO
      const dtoObject = new FollowUserDtoConverter(requestData);

      // Execute Use Case
      const result = await this.followUserUseCase.execute(
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
    console.error("FollowUserController Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  execute() {
    return (req: Request, res: Response) => this.handle(req, res);
  }
}
