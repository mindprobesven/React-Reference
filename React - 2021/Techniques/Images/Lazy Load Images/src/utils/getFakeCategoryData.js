/* eslint-disable max-len */
import { v4 as uuidv4 } from 'uuid';

const getFakeCategoryData = () => {
  console.log('Creating fake data set...');

  const categories = ['electronics', 'kids'];
  const count = 100;
  const itemsData = {};

  categories.forEach((category) => {
    itemsData[category] = {
      byIDs: {},
      allIDs: [],
    };

    let i;
    for (i = 0; i < count; i += 1) {
      const item = {
        id: uuidv4(),
        slugName: `${category}-tablet-model-${i}`,
        category,
        title: `${category.toLocaleUpperCase()} Tabled 10" IPS Model: [ ${i} ]`,
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris volutpat quam ligula, nec posuere justo luctus sed. Cras suscipit aliquet elementum. Ut commodo lacinia erat et tincidunt.',
        price: 45,
        discountPercent: 65,
        images: [`https://picsum.photos/200/200?random=${Math.floor(Math.random() * 100)}`],
      };

      itemsData[category].byIDs[item.id] = item;
      itemsData[category].allIDs.push(item.id);
    }
  });

  return itemsData;
};

export default getFakeCategoryData;
