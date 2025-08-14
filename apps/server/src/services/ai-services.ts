export type Vehicle = {
  vin?: string;
  make?: string;
  model?: string;
  year?: number;
  engine?: string;
};

export const toolsSpec = [
  {
    type: "function",
    function: {
      name: "search_parts",
      description:
        "Search parts by query/category with optional vehicle filter.",
      parameters: {
        type: "object",
        properties: {
          query: {
            type: "string",
            description: "Free text like 'brake pads'.",
          },
          category: {
            type: "string",
            description: "oils|tires|batteries|accessories",
          },
          vehicle: {
            type: "object",
            properties: {
              vin: { type: "string" },
              make: { type: "string" },
              model: { type: "string" },
              year: { type: "integer" },
              engine: { type: "string" },
            },
          },
          limit: { type: "integer", default: 10 },
        },
        required: [],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "check_fitment",
      description:
        "Return fitment result TRUE/FALSE for a SKU against a vehicle.",
      parameters: {
        type: "object",
        properties: {
          sku: { type: "string" },
          vehicle: {
            type: "object",
            properties: {
              vin: { type: "string" },
              make: { type: "string" },
              model: { type: "string" },
              year: { type: "integer" },
              engine: { type: "string" },
            },
            required: [],
          },
        },
        required: ["sku"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "check_inventory",
      description: "Get stock/price for a SKU.",
      parameters: {
        type: "object",
        properties: { sku: { type: "string" } },
        required: ["sku"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "add_to_cart",
      description: "Add SKU to user cart.",
      parameters: {
        type: "object",
        properties: {
          userId: { type: "string" },
          sku: { type: "string" },
          quantity: { type: "integer", minimum: 1, default: 1 },
        },
        required: ["userId", "sku"],
        additionalProperties: false,
      },
    },
  },
  {
    type: "function",
    function: {
      name: "order_status",
      description: "Check order status for a given orderId.",
      parameters: {
        type: "object",
        properties: { orderId: { type: "string" } },
        required: ["orderId"],
      },
    },
  },
] as const;

// --- Implementations (call your Mongo/Mongoose services here) ---
export const toolImpl = {
  async search_parts(args: any) {
    // TODO: query your products collection with text + filters
    return [
      // minimal example
      {
        sku: "OIL-5W30-1L",
        title: "5W-30 Synthetic Oil 1L",
        price: 12.5,
        inStock: true,
        fits: ["toyota/corolla/2015"],
        rating: 4.7,
      },
    ];
  },
  async check_fitment(args: any) {
    // TODO: your fitment logic (by VIN or make/model/year/engine)
    return {
      sku: args.sku,
      fits: true,
      confidence: 0.92,
      notes: "Matches OEM spec 90915-10001.",
    };
  },
  async check_inventory(args: any) {
    // TODO: inventory lookup
    return {
      sku: args.sku,
      inStock: true,
      qty: 23,
      price: 12.5,
      currency: "USD",
    };
  },
  async add_to_cart(args: any) {
    // TODO: cart mutation
    return { ok: true, lineItemId: "li_123", subtotal: 25.0, currency: "USD" };
  },
  async order_status(args: any) {
    // TODO: order lookup
    return {
      orderId: args.orderId,
      status: "shipped",
      tracking: "ZX1234567",
      etaDays: 3,
    };
  },
};
