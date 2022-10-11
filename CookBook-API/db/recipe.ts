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
    ingredient2?: {
        "name":string,
        "amount": string
    };
    ingredient3?: {
        "name":string,
        "amount": string
    };
    ingredient4?: {
        "name":string,
        "amount": string
    };
    ingredient5?: {
        "name":string,
        "amount": string
    };
    ingredient6?: {
        "name":string,
        "amount": string
    };

  }