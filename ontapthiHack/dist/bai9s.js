class Review {
    constructor(reviewId, reviewerId, text) {
        this.replies = [];
        this.reviewId = reviewId;
        this.reviewerId = reviewerId;
        this.text = text;
    }
    addReply(reply) {
        this.replies.push(reply);
    }
}
class Article {
    constructor(articleId, authorId, content) {
        this.likedBy = [];
        this.reviews = [];
        this.articleId = articleId;
        this.authorId = authorId;
        this.content = content;
    }
    addLike(userId) {
        if (!this.likedBy.includes(userId)) {
            this.likedBy.push(userId);
        }
    }
    addReview(review) {
        this.reviews.push(review);
    }
}
class Member {
    constructor(memberId) {
        this.articles = [];
        this.following = [];
        this.memberId = memberId;
    }
    createArticle(content) {
        const newId = this.articles.length + 1;
        const article = new Article(newId, this.memberId, content);
        this.articles.push(article);
        return article;
    }
    commentOnArticle(articleId, commentText) {
        let targetArticle = this.articles.find(a => a.articleId === articleId);
        if (!targetArticle) {
            for (const followed of this.following) {
                targetArticle = followed.articles.find(a => a.articleId === articleId);
                if (targetArticle)
                    break;
            }
        }
        if (!targetArticle)
            return;
        const newReviewId = targetArticle.reviews.length + 1;
        const review = new Review(newReviewId, this.memberId, commentText);
        targetArticle.addReview(review);
    }
    follow(member) {
        if (member.memberId !== this.memberId && !this.following.includes(member)) {
            this.following.push(member);
        }
    }
    likeArticle(articleId) {
        let targetArticle = this.articles.find(a => a.articleId === articleId);
        if (!targetArticle) {
            for (const followed of this.following) {
                targetArticle = followed.articles.find(a => a.articleId === articleId);
                if (targetArticle)
                    break;
            }
        }
        if (!targetArticle)
            return;
        targetArticle.addLike(this.memberId);
    }
    viewFeed() {
        let feed = [];
        for (const followed of this.following) {
            feed = feed.concat(followed.articles);
        }
        return feed.sort((a, b) => b.articleId - a.articleId);
    }
}
