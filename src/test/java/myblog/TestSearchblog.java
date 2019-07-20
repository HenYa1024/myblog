package myblog;

import java.util.List;

import com.ncwu.pojo.Article;
import com.ncwu.service.impl.ArticleServiceImpl;

public class TestSearchblog {
	public static void main(String[] args) {
		ArticleServiceImpl serviceImpl = new ArticleServiceImpl();
		List<Article> selectBlog = serviceImpl.selectBlog("Hello");
		for (Article article : selectBlog) {
			System.err.println(article);
		}
	}
}
