package myblog;

import com.ncwu.pojo.Article;
import com.ncwu.service.impl.ArticleServiceImpl;

public class TestAddArticle {
	public static void main(String[] args) {
		ArticleServiceImpl articleServiceImpl = new ArticleServiceImpl();
		Article article = new Article();
		article.setUserId(1);
		article.setArticleTitle("test");
		article.setArticleContent("Hello");
		article.setArticleType("物联网");
		article.setArticleNum(1);
		int article2 = articleServiceImpl.AddArticle(article);
		System.out.println(article2);
	}
}
