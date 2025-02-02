import { Helmet } from 'react-helmet';
import Cover from '../../Shared/Cover/Cover';
import menuImg from '../../../assets/menu/banner3.jpg';
import dessertImg from '../../../assets/menu/dessert-bg.jpeg';
import pizzaImg from '../../../assets/menu/pizza-bg.jpg';
import saladImg from '../../../assets/menu/salad-bg.jpg';
import soupImg from '../../../assets/menu/soup-bg.jpg';
import useMenu from '../../../hooks/useMenu';
import SectionTitle from '../../../components/SectionTitle/SectionTitle';
import MenuCategory from '../MenuCategory/MenuCategory';

const Menu = () => {
        const [menu] = useMenu();
        const dessert = menu.filter(item => item.category === 'dessert'); 
        const soup = menu.filter(item => item.category === 'soup');
        const salad = menu.filter(item => item.category === 'salad');
        const pizza = menu.filter(item => item.category === 'pizza');
        const offered = menu.filter(item => item.category === 'offered');
    return (
        <div>
            <div>
                <Helmet>
                    <title>Bistro | Menu</title>
                </Helmet>
            </div>
            <Cover img={menuImg} title="Our Menu"></Cover>
            <SectionTitle subHeading="Don't Miss" heading="Today's Offered"></SectionTitle>
            <MenuCategory items={offered}></MenuCategory>
            <MenuCategory items={dessert} title="Dessert" coverImg={dessertImg}></MenuCategory>
            <MenuCategory items={pizza} title="Dessert" title={`pizza`} coverImg={pizzaImg}></MenuCategory>
            <MenuCategory items={salad} title="Dessert" title={`salad`} coverImg={saladImg}></MenuCategory>
            <MenuCategory items={soup} title="Dessert" title={`soup`} coverImg={soupImg}></MenuCategory>
        </div>
    );
};

export default Menu;