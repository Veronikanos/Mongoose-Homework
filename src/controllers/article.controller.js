import Article from '../models/article.model.js';
import User from '../models/user.model.js';

export const getArticles = async (req, res, next) => {
  try {
    const {title} = req.body;
    const {page, limit} = req.query;

    if (!title) {
      return res.status(404).json({message: 'Title required!'});
    }

    const pageNumber = parseInt(page) || 1;
    const limitSize = parseInt(limit) || 3;

    if (
      isNaN(pageNumber) ||
      pageNumber < 0 ||
      isNaN(limitSize) ||
      limitSize < 0
    ) {
      return res
        .status(400)
        .json({message: 'Invalid pagination parameters'});
    }

    const shift = (pageNumber - 1) * limitSize;

    const articles = await Article.find({title})
      .populate('owner', 'fullName email age -_id')
      .skip(shift)
      .limit(limitSize)
      .lean();

    if (articles.length === 0) {
      return res.status(200).json({message: 'No articles found'});
    }

    return res.status(200).json({articles, currentPage: pageNumber});
  } catch (err) {
    next(err);
  }
};

export const getArticleById = async (req, res, next) => {
  try {
    //  I can not see that in README but I suggest such implementation

    const {articleId} = req.params;

    const article = await Article.findById(articleId).populate(
      'owner',
      'fullName email age'
    );

    if (!article) {
      return res.status(404).json({message: 'Article not found'});
    }

    return res.status(200).json(article);
  } catch (err) {
    next(err);
  }
};

export const createArticle = async (req, res, next) => {
  try {
    const {title, subtitle, description, owner, category} = req.body;

    const existingUser = await User.findById(owner);
    if (!existingUser) {
      return res.status(404).json({message: 'Owner not found'});
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
};

export const updateArticleById = async (req, res, next) => {
  try {
    const {articleId} = req.params;
    const {title, subtitle, description, category, owner} = req.body;

    const existingArticle = await Article.findById(articleId);
    if (!existingArticle) {
      return res.status(404).json({message: 'Article not found'});
    }

    const existingUser = await User.findById(owner);
    if (!existingUser) {
      return res.status(404).json({message: 'User not found'});
    }

    if (existingArticle.owner.toString() !== owner) {
      return res
        .status(403)
        .json({message: 'Only the owner can update the article'});
    }

    const updatedArticle = await Article.findByIdAndUpdate(
      articleId,
      {
        title,
        subtitle,
        description,
        category,
        updatedAt: new Date(),
      },
      {new: true}
    );

    return res.status(200).json(updatedArticle);
  } catch (err) {
    next(err);
  }
};

export const deleteArticleById = async (req, res, next) => {
  try {
    const {articleId} = req.params;
    const {owner} = req.body;

    if (!owner) {
      return res.status(404).json({message: 'Owner required!'});
    }

    const existingArticle = await Article.findById(
      articleId
    ).populate('owner');

    if (!existingArticle) {
      return res.status(404).json({message: 'Article not found'});
    }

    const existingUser = await User.findById(owner);
    if (!existingUser) {
      return res.status(404).json({message: 'Owner not found'});
    }

    if (existingArticle.owner.id.toString() !== owner) {
      return res
        .status(403)
        .json({message: 'Only the owner can delete the article'});
    }

    await Article.deleteOne({_id: articleId});
    existingUser.numberOfArticles -= 1;
    await existingUser.save();

    return res
      .status(200)
      .json({message: 'Article deleted successfully'});
  } catch (err) {
    next(err);
  }
};
