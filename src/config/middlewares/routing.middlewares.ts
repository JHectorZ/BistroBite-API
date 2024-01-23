import foodRouter from "../../app/routes/food.routes";
import categoryRouter from "../../app/routes/category.routes";
import userRouter from "../../app/routes/user.routes";

export const routingModule = (server: any) => {
  server.app.use("/food", foodRouter);
  server.app.use("/category", categoryRouter);
  server.app.use("/user", userRouter);

  return (req: any, response: any, next: any) => {
    next();
  };
};
