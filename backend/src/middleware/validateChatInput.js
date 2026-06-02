const validateChatInput =
(req, res, next) => {

  const { message } = req.body;

  if (!message) {

    return res.status(400).json({
      success: false,
      message: "Message is required."
    });

  }

  if (
    typeof message !== "string"
  ) {

    return res.status(400).json({
      success: false,
      message: "Message must be text."
    });

  }

  if (
    !message.trim()
  ) {

    return res.status(400).json({
      success: false,
      message: "Message cannot be empty."
    });

  }

  if (
    message.length > 500
  ) {

    return res.status(400).json({
      success: false,
      message: "Message too long."
    });

  }

  next();

};

module.exports =
validateChatInput;