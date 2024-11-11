import { Injectable } from '@nestjs/common';
import axios from 'axios'; // N'oubliez pas d'installer axios : npm install axios

// Interface pour typer les données d'un article
export interface VintedItem {
  id: string;
  title: string;
  description: string;
  price: number;
  size: string;
  imageUrl: string;
}

// Interface pour la réponse de l'API
interface VintedApiResponse {
  props: {
    pageProps: {
      items?: VintedItem[];
      // autres propriétés si nécessaire
    };
  };
}

@Injectable()
export class VintedService {
  private readonly apiUrl = 'https://www.vinted.fr/catalog?time=1731345920&catalog%5B%5D=1206&brand_ids%5B%5D=12&page=1'; // À remplacer par l'URL réelle

  async getItems(): Promise<VintedItem[]> {
    try {
      const response = await axios.get(this.apiUrl);
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des articles: ${error.message}`);
    }
  }

  async getItemById(id: string): Promise<VintedItem> {
    try {
      const response = await axios.get(`${this.apiUrl}/${id}`);
      return response.data;
    } catch (error) {
      throw new Error(`Erreur lors de la récupération de l'article ${id}: ${error.message}`);
    }
  }

  async getLatestItems(): Promise<VintedItem[]> {
    try {
      const response = await axios.get(this.apiUrl);
      const items = response.data;

       // Extraire le JSON depuis le HTML
    const jsonDataMatch = items.match(/<script id="__NEXT_DATA__" type="application\/json">(.+?)<\/script>/);
    if (!jsonDataMatch || jsonDataMatch.length < 2) {
      throw new Error("JSON data not found on the page.");
    }
    const jsonData = JSON.parse(jsonDataMatch[1]);
    const mainCategories = jsonData?.props?.pageProps?._layout || [];
    console.log(mainCategories);
const formattedArticles = mainCategories.flatMap(category => 
  category.catalogs.map(article => ({
    name: article.title || 'Nom non disponible',
    price: article.price || 'Prix non disponible', // Vérifiez que l'information est bien présente ici
    size: article.size_group_ids ? article.size_group_ids.join(', ') : 'Taille non disponible',
    brand: article.brand || 'Marque non disponible',
    imageUrl: article.photo?.url || 'Image non disponible',
  }))
);
     

      return formattedArticles
    } catch (error) {
      throw new Error(`Erreur lors de la récupération des derniers articles: ${error.message}`);
    }
  }
}
