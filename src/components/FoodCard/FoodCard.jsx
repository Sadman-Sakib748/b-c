import Swal from 'sweetalert2'
import useAuth from "../../hooks/useAuth";
import { useLocation, useNavigate } from 'react-router-dom';
import useAxiosSecure from '../../hooks/useAxiosSecure';
import useCart from '../../hooks/useCart';


const FoodCard = ({ item }) => {
    const { name, image, price, recipe, _id } = item;
    const { user } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const axiosSecure = useAxiosSecure();
    const [, refetch] = useCart();
    console.log(location, 'locateion name')


    const handleFoodCart = (food) => {
        if (user && user.email) {
            const cartItem = {
                menuId: _id,
                email: user.email,
                name,
                image,
                price
            };
            axiosSecure.post("/carts", cartItem)
                .then(res => {
                    if (res.data.insertedId) {
                        Swal.fire({
                            icon: "success",
                            position: 'top-right',
                            title: `${name}Added to Cart`,
                            text: `has been added successfully!`,
                            timer: 1500
                        });
                    }
                    refetch();
                })
                .catch(error => {
                    console.error("Error adding to cart:", error);
                    Swal.fire({
                        icon: "error",
                        title: "Oops...",
                        text: "Something went wrong! Please try again."
                    });
                });
        } else {
            Swal.fire({
                title: "You are not logged in",
                text: "Please log in to add items to your cart.",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, Login Now"
            }).then((result) => {
                if (result.isConfirmed) {
                    navigate("/login", { state: { from: location } });
                }
            });
        }
    };

    return (
        <div className="card bg-base-100 w-96 shadow-xl">
            <figure>
                <img src={image} alt={name} />
            </figure>
            <p className='absolute bg-gray-900 right-0 px-4 rounded-xl text-white mr-4 mt-4'>{price}</p>
            <div className="card-body flex flex-col items-center">
                <h2 className="card-title">{name}</h2>
                <p>{recipe}</p>
                <div className="card-actions justify-end">
                    <button onClick={handleFoodCart}
                        className="btn btn-outline border-0
                      bg-slate-200 border-orange-400 border-b-4 mt-4">
                        Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
};

export default FoodCard;
