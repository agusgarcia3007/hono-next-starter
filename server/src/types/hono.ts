import { JWTPayload } from "./jwt";

export type AppEnv = {
  Variables: {
    jwtPayload: JWTPayload;
  };
};
