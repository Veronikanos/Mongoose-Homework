import Article from '../models/article.model.js';
import User from '../models/user.model.js';

export const getArticles = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
}

export const getArticleById = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
}

export const createArticle = async (req, res, next) => {
  try {
    const { title, subtitle, description, owner, category } = req.body;

		const existingUser = await User.findById(owner);
    if (!existingUser) {
      return res.status(404).json({ message: 'Owner not found' });
    }

    const newArticle = new Article({
      title,
      subtitle,
      description,
      owner,
      category,
    });

    existingUser.numberOfArticles += 1;
		await existingUser.save();
		const savedArticle = await newArticle.save();

    return res.status(201).json(savedArticle);
  } catch (err) {
    next(err);
  }
}

export const updateArticleById = async (req, res, next) => {
  try {
		const { articleId } = req.params;
    const { title, subtitle, description, category, owner } = req.body;

    const existingArticle = await Article.findById(articleId);
    if (!existingArticle) {
      return res.status(404).json({ message: 'Article not found' });
    }


    const existingUser = await User.findById(owner);
    if (!existingUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (existingArticle.owner.toString() !== owner) {
      return res.status(403).json({ message: 'Only the owner can update the article' });
    }

		const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      {
        title,
        subtitle,
        description,
        category,
        updatedAt: new Date()
      },
      { new: true }
    );

    return res.status(200).json(updatedArticle);

  } catch (err) {
    next(err);
  }
}

export const deleteArticleById = async (req, res, next) => {
  try {

  } catch (err) {
    next(err);
  }
}
