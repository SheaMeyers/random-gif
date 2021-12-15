import { rest } from "msw";

export const handlers = [
  rest.get(`https://api.giphy.com/v1/gifs/random`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: {
          embed_url: "https://giphy.com/embed/09Wz9EoEGPd3E44GEg",
          title: "French Open Tennis GIF by Roland-Garros",
          rating: "g",
        },
      })
    );
  }),

  rest.get(`https://api.giphy.com/v1/gifs/search`, (req, res, ctx) => {
    return res(
      ctx.json({
        data: [
          {
            embed_url: "https://giphy.com/embed/vwhPUa8vRB6hCJZLzQ",
            title: "Antonio Brown Smile GIF by Uninterrupted",
            rating: "g",
            images: {
              "480w_still": {
                url: "https://media2.giphy.com/media/vwhPUa8vRB6hCJZLzQ/480w_s.jpg?cid=e1bb72ffbakv9fa9izf25inycqvelmihlf9y06g2noemkjqv&rid=480w_s.jpg&ct=g",
              },
            },
          },
        ],
      })
    );
  }),
];
