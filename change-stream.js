import { getCollection } from "./mongo-client.js"

export async function getChangeStream(collectionName) {
  return (await getCollection(collectionName)).watch(
    [
      {
        $match: {
          operationType: {
            $in: ["insert", "update", "replace"],
          },
        },
      },
      {
        $project: {
          documentKey: false,
        },
      },
    ],
    { fullDocument: "updateLookup" }
  )
}
