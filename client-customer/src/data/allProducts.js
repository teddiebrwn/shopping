import menProducts from './menProducts';
import womenProducts from './womenProducts';
import outwearProducts from './outwearProducts';
import accessoriesProducts from './accessoriesProducts';

// Tổng hợp tất cả các sản phẩm từ các danh mục khác nhau
const allProducts = [
  ...menProducts,
  ...womenProducts,
  ...outwearProducts,
  ...accessoriesProducts
];

export default allProducts;
