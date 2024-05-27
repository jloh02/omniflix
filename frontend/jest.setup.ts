import dotenv from "dotenv";

export default () => {
  dotenv.config({ path: ".env.local" });
};
