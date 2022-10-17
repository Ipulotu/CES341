export interface recipe {
    Name: string;
    description: string;
    type: string;
    servings: number;
    timeToCook: string;
    ingredient1: {
        "name":string,
        "amount": string
    };
    [key: string]: any;

  }