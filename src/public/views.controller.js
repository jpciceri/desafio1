

export const getAllProducts = async (req, res) => {
    try {
        // Retrieve the list of products
        const products = await manager.getProducts();

        const sessionData = req.session.user;

        sessionData.username =
            sessionData.email.charAt(0).toUpperCase() +
            sessionData.email.slice(1);

    
        res.render("partials/_productsView", {
            title: "Vista Products Add to cart",
            products,
            sessionData,
        });
    } catch (error) {
        return res.status(500).json({ message: "Something went wrong" });
    }
};
