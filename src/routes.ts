import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { createClient } from "@supabase/supabase-js";

const router = express.Router();
dotenv.config();

const supabaseUrl = process.env.DB_URL as string;
const supabaseKey = process.env.DB_KEY as string;

const supabase = createClient(supabaseUrl, supabaseKey);

router.get("/patients", async (req: Request, res: Response) => {
  // @JonK: filtering syntax
  const { data, error } = await supabase.from("patients").select();

  if (error) {
    res.status(400).send({ message: `ERROR: ${error.message}` });
  }

  res.send(data);
});

router.post("/patients", async (req: Request, res: Response) => {
  const data = req.body;
  const { error } = await supabase.from("patients").insert(data);

  if (error) {
    res.status(400).send({ message: `ERROR: ${error.message}` });
  }

  res.send("Patient created");
});

router.put("/patients/:id", async (req: Request, res: Response) => {
  const data = req.body;
  const id = req.params.id;
  const { error } = await supabase.from("patients").update(data).eq("id", id);

  if (error) {
    res.status(400).send({ message: `ERROR: ${error.message}` });
  }

  res.send(`Patient ${id} updated`);
});

router.delete("/patients/:id", async (req: Request, res: Response) => {
  const id = req.params.id;
  const { error } = await supabase.from("patients").delete().eq("id", id);

  if (error) {
    res.status(400).send({ message: `ERROR: ${error.message}` });
  }

  res.send(`Patient ${id} deleted`);
});

export default router;
