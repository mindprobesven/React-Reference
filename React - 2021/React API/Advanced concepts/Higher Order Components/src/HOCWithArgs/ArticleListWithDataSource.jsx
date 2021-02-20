import withDataSource from './withDataSource';
import ArticleList from './ArticleList';

const ArticleListWithDataSource = withDataSource(
  ArticleList,
  (DataSource, props) => DataSource.getArticles(props.id),
);

export default ArticleListWithDataSource;
