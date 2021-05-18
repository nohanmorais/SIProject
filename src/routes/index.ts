import { Router } from 'express';
import usersRouter from './users.routes';
import sessionsRouter from './session.routes';
import emailRouter from './sendmail.routes';
import registerPasswordRouter from './registerPassword.routes';
import confirmRegister from './confirmRegister.routes';

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/sessions", sessionsRouter);
routes.use("/email", emailRouter);
routes.use("/registerPassword", registerPasswordRouter);
routes.use("/confirmRegister", confirmRegister);


export default routes;
