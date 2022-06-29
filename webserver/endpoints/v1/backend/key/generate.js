/**
 *
 * @param {import("@betadv/easy-db")} database
 * @returns
 */

module.exports = (app, database) => {
  return {
    options: {
      useKeyAuth: false,
    },
    name: "generate",
    type: "get",
    run: async (req, res) => {
      // do something here
    },
  };
};
