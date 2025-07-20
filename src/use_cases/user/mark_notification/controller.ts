import { Request, Response } from "express";
import { MarkNotificationDtoConverter } from "./dto";
import { MarkNotificationUseCase } from "./usecase";
import { MarkNotificationRequest } from "./request";
import { MarkNotificationValidator } from "./validator";

export class MarkNotificationController {
  private markNotificationUseCase: MarkNotificationUseCase;

  constructor(markNotificationUseCase: MarkNotificationUseCase) {
    this.markNotificationUseCase = markNotificationUseCase;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const requestData = req.body as unknown as MarkNotificationRequest;

      // Validate Request
      const validator = new MarkNotificationValidator(requestData);
      const errors = validator.parseRequest();
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      // Convert DTO
      const dtoObject = new MarkNotificationDtoConverter(requestData);

      // Execute Use Case
      const result = await this.markNotificationUseCase.execute(
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
    console.error("MarkNotificationController Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  execute() {
    return (req: Request, res: Response) => this.handle(req, res);
  }
}
