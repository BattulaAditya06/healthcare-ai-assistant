const express =
require("express");

const router =
express.Router();

router.get(
  "/",
  (req, res) => {

    res.json({

      project:
        "AI Healthcare Assistant API",

      version: "1.0.0",

      endpoints: [

        {

          method: "POST",

          route:
            "/api/chat/analyze",

          description:
            "Analyze user symptoms using NLP + Hybrid ML",

          body: {

            message:
              "string"

          }

        },

        {

          method: "GET",

          route:
            "/api/v1/health",

          description:
            "Check API health"

        }

      ]

    });

  }
);

module.exports =
router;