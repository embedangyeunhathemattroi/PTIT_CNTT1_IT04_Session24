class Review {
  public reviewId: number;
  public reviewerId: number;
  public text: string;
  public replies: Review[] = [];

  constructor(reviewId: number, reviewerId: number, text: string) {
    this.reviewId = reviewId;
    this.reviewerId = reviewerId;
    this.text = text;
  }

  addReply(reply: Review): void {
    this.replies.push(reply);
  }
}

class Article {
  public articleId: number;
  public authorId: number;
  public content: string;
  public likedBy: number[] = [];
  public reviews: Review[] = [];

  constructor(articleId: number, authorId: number, content: string) {
    this.articleId = articleId;
    this.authorId = authorId;
    this.content = content;
  }

  addLike(userId: number): void {
    if (!this.likedBy.includes(userId)) {
      this.likedBy.push(userId);
    }
  }

  addReview(review: Review): void {
    this.reviews.push(review);
  }
}

class Member {
  public memberId: number;
  public articles: Article[] = [];
  public following: Member[] = [];

  constructor(memberId: number) {
    this.memberId = memberId;
  }

  createArticle(content: string): Article {
    const newId = this.articles.length + 1;
    const article = new Article(newId, this.memberId, content);
    this.articles.push(article);
    return article;
  }

  commentOnArticle(articleId: number, commentText: string): void {
    let targetArticle: Article | undefined = this.articles.find(a => a.articleId === articleId);
    if (!targetArticle) {
      for (const followed of this.following) {
        targetArticle = followed.articles.find(a => a.articleId === articleId);
        if (targetArticle) break;
      }
    }
    if (!targetArticle) return;

    const newReviewId = targetArticle.reviews.length + 1;
    const review = new Review(newReviewId, this.memberId, commentText);
    targetArticle.addReview(review);
  }

  follow(member: Member): void {
    if (member.memberId !== this.memberId && !this.following.includes(member)) {
      this.following.push(member);
    }
  }

  likeArticle(articleId: number): void {
    let targetArticle: Article | undefined = this.articles.find(a => a.articleId === articleId);
    if (!targetArticle) {
      for (const followed of this.following) {
        targetArticle = followed.articles.find(a => a.articleId === articleId);
        if (targetArticle) break;
      }
    }
    if (!targetArticle) return;
    targetArticle.addLike(this.memberId);
  }

  viewFeed(): Article[] {
    let feed: Article[] = [];
    for (const followed of this.following) {
      feed = feed.concat(followed.articles);
    }
    return feed.sort((a, b) => b.articleId - a.articleId);
  }
}
