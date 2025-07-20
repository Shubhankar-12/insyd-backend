import { Request, Response } from "express";
import { GetUserNotificationDtoConverter } from "./dto";
import { GetUserNotificationUseCase } from "./usecase";
import { GetUserNotificationRequest } from "./request";
import { GetUserNotificationValidator } from "./validator";

export class GetUserNotificationController {
  private getUserNotificationUseCase: GetUserNotificationUseCase;

  constructor(getUserNotificationUseCase: GetUserNotificationUseCase) {
    this.getUserNotificationUseCase = getUserNotificationUseCase;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const requestData = req.query as unknown as GetUserNotificationRequest;

      // Validate Request
      const validator = new GetUserNotificationValidator(requestData);
      const errors = validator.parseRequest();
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      // Convert DTO
      const dtoObject = new GetUserNotificationDtoConverter(requestData);

      // Execute Use Case
      const result = await this.getUserNotificationUseCase.execute(
        dtoObject.getDtoObject()
      );

      if (typeof result === "object" && "error" in result) {
        res.status(400).json({ error: result.error });
        return;
      }
      const formattedResponse = {
        result: result.paginatedResults,
        metadata: {
          totalCount: result.totalCount?.[0]?.count || 0,
        },
      };
      res.status(200).json(formattedResponse);
    } catch (error: any) {
      this.handleError(res, error);
    }
  }

  private handleError(res: Response, error: any): void {
    console.error("GetUserNotificationController Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  execute() {
    return (req: Request, res: Response) => this.handle(req, res);
  }
}
