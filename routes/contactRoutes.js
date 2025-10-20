import { Router } from "express";
const router = Router();

router.get("/", (_req, res) => {
   res.status(200).json({message: "welcome to the contacts API"});
});

router.get(`/:id`, (req, res) => {
    res.status(200).json({message: `contact with id ${req.params.id}`});
});

router.post('/', (req, res) => {
    res.status(201).json({message: "contact created"});
});

router.put(`/:id`, (req, res) => {
    res.status(200).json({message: `contact with id ${req.params.id} updated`});
});

router.delete(`/:id`, (req, res) => {
    res.status(200).json({message: `contact with id ${req.params.id} deleted`});
});

export default router;