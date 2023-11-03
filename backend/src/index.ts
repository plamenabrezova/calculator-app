import express, { Request, Response } from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { handleErrors, handleUndefinedRoutes } from './errorHandler'

const port = 3000;

const app = express();

app.use(cors({
    credentials: true,
    origin: ['http://localhost:4200']
}));

app.use(bodyParser.json());

app.get('/sum/:num1/:num2', (req: Request, res: Response) => {
    const { num1, num2 } = req.params;
    try {
        const result = Function("return " + num1 + '+' + num2)();
        return res.status(200).send({ result });
    } catch (err) {
        return res.status(400).send({ error: `Failed to calculate, try again.` });
    }
})

app.get('/sub/:num1/:num2', (req: Request, res: Response) => {
    const { num1, num2 } = req.params;
    try {
        const result = Function("return " + num1 + '-' + num2)();
        return res.status(200).send({ result });
    } catch (err) {
        return res.status(400).send({ error: `Failed to calculate, try again.` });
    }
})

app.get('/multi/:num1/:num2', (req: Request, res: Response) => {
    const { num1, num2 } = req.params;
    try {
        const result = Function("return " + num1 + '*' + num2)();
        return res.status(200).send({ result });
    } catch (err) {
        return res.status(400).send({ error: `Failed to calculate, try again.` });
    }
})

app.get('/div/:num1/:num2', (req: Request, res: Response) => {
    const { num1, num2 } = req.params;
    try {
        const result = Function("return " + num1 + '/' + num2)();
        return res.status(200).send({ result });
    } catch (err) {
        return res.status(400).send({ error: `Failed to calculate, try again.` });
    }
})

app.use(handleUndefinedRoutes);
app.use(handleErrors);

app.listen(port, () => {
    console.log(`Calculator server on http://localhost:${port}`);
})
