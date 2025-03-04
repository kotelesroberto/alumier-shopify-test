import fetch from "node-fetch";
import * as dotenv from "dotenv";

dotenv.config();

interface Order {
  id: string;
  name: string;
  customer: {
    displayName: string,
  };
  lineItems: {
    edges: {
      node: {
        quantity: number,
        product: {
          id: string,
          title: string,
        },
      },
    }[],
  };
  createdAt: string;
}

interface OrdersResponse {
  data: {
    orders: {
      edges: {
        node: Order,
      }[],
      pageInfo: {
        hasNextPage: boolean,
        endCursor: string | null,
      },
    },
  };
}

async function getOrdersWithProduct(
  productId: string,
  apiKey: string,
  storeUrl: string,
  days: number = 30
): Promise<Order[]> {
  const apiUrl = `https://${storeUrl}/admin/api/2024-04/graphql.json`;
  const headers = {
    "Content-Type": "application/json",
    "X-Shopify-Access-Token": apiKey,
  };

  const startDate = new Date();
  startDate.setDate(startDate.getDate() - days);
  const formattedStartDate = startDate.toISOString();

  let hasNextPage = true;
  let cursor: string | null = null;
  let allOrders: Order[] = [];

  while (hasNextPage) {
    const query = `
      query {
        orders(first: 250, query: "created_at:>='${formattedStartDate}'${
      cursor ? `, after: "${cursor}"` : ""
    }) {
          edges {
            node {
              id
              name
              customer {
                displayName
              }
              lineItems(first: 250) {
                edges {
                  node {
                    quantity
                    product {
                      id
                      title
                    }
                  }
                }
              }
              createdAt
            }
          }
          pageInfo {
            hasNextPage
            endCursor
          }
        }
      }
    `;

    try {
      const response = await fetch(apiUrl, {
        method: "POST",
        headers,
        body: JSON.stringify({ query }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: OrdersResponse = await response.json();

      if (!data.data || !data.data.orders) {
        console.error("Unexpected GraphQL response:", data);
        break;
      }

      const orders = data.data.orders.edges.map((edge) => edge.node);

      for (const order of orders) {
        const containsProduct = order.lineItems.edges.some(
          (lineItem) =>
            lineItem.node.product &&
            lineItem.node.product.id === `gid://shopify/Product/${productId}`
        );

        if (containsProduct) {
          allOrders.push(order);
        }
      }

      hasNextPage = data.data.orders.pageInfo.hasNextPage;
      cursor = data.data.orders.pageInfo.endCursor;
    } catch (error) {
      console.error("Error fetching orders:", error);
      break;
    }
  }

  return allOrders;
}

async function main() {
  const productId = process.env.SHOPIFY_PRODUCT_ID;
  const apiKey = process.env.SHOPIFY_API_KEY;
  const storeUrl = process.env.SHOPIFY_STORE_URL;

  if (!productId || !apiKey || !storeUrl) {
    console.error(
      "Please set SHOPIFY_PRODUCT_ID, SHOPIFY_API_KEY, and SHOPIFY_STORE_URL environment variables."
    );
    return;
  }

  try {
    const orders = await getOrdersWithProduct(productId, apiKey, storeUrl);
    console.log("Orders containing the specified product:");
    orders.forEach((order) => {
      console.log(
        `- Order ID: ${order.name}, Customer: ${order.customer.displayName}, Created At: ${order.createdAt}`
      );
      order.lineItems.edges.forEach((lineItem) => {
        if (
          lineItem.node.product &&
          lineItem.node.product.id === `gid://shopify/Product/${productId}`
        ) {
          console.log(
            `  - Product: ${lineItem.node.product.title} (ID: ${lineItem.node.product.id}), Quantity: ${lineItem.node.quantity}`
          );
        }
      });
    });
    console.log(`Total orders found: ${orders.length}`);
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();
