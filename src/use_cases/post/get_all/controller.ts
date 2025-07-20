import { Request, Response } from "express";
import { GetAllPostDtoConverter } from "./dto";
import { GetAllPostUseCase } from "./usecase";
import { GetAllPostRequest } from "./request";
import { GetAllPostValidator } from "./validator";

export class GetAllPostController {
  private getAllPostUseCase: GetAllPostUseCase;

  constructor(getAllPostUseCase: GetAllPostUseCase) {
    this.getAllPostUseCase = getAllPostUseCase;
  }

  async handle(req: Request, res: Response): Promise<void> {
    try {
      const requestData = req.query as unknown as GetAllPostRequest;

      // Validate Request
      const validator = new GetAllPostValidator(requestData);
      const errors = validator.parseRequest();
      if (errors.length > 0) {
        res.status(400).json({ errors });
        return;
      }

      // Convert DTO
      const dtoObject = new GetAllPostDtoConverter(requestData);

      // Execute Use Case
      const result = await this.getAllPostUseCase.execute(
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
    console.error("GetAllPostController Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }

  execute() {
    return (req: Request, res: Response) => this.handle(req, res);
  }
}
