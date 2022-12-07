import { RequestHandler } from "express";
import axios from "axios";

export const getNews: RequestHandler = async (req, res) => {
  try {
    const response = await axios.get("https://dummyjson.com/products");

    if (!response) res.status(204).send({message: 'No products found'})

    res.status(200).send(response.data);
  } catch (err) {
    res.status(500).send(err);
  }
};
