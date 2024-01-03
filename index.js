import { getChangeStream } from "./change-stream.js"
import { client } from './elastic-client.js'

(async () => {
  const watchCustomers = await getChangeStream('customers')

  watchCustomers.on("change", async (change) => {
    const doc = change.fullDocument;
    doc.id = doc._id;
    Reflect.deleteProperty(doc, "_id");

    const response = await client.index({
      id: doc.id,
      index: "users",
      body: doc,
      type: "doc",
    });
    
    console.log(
      "document upserted successsfully with status code",
      response.statusCode
    )
  })

  watchCustomers.on("error", (error) => {
    console.error(error)
  })
})()
