//import global from "../__test-help__/setup";
import "jest";
import { makeServer } from "@/graphql";

describe('/api/graphql', () => {
  test('Test endpoint returns books', async () => {

    const testServer = makeServer();
    await testServer.start();
    const response = await testServer.executeOperation({
      query: `#graphql
    query GetBooks {
      books {
        title
        author
      }
    }`});
    expect(response.data?.books.length).toBeGreaterThan(0);
    expect(response.data?.books[0].title).toBeTruthy();

    await testServer.stop();
  })
});