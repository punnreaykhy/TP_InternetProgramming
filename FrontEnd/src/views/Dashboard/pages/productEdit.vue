<script>
    import categoryApi from '@/libs/apis/category';
    import itemApi from '@/libs/apis/item';
    import productApi from '@/libs/apis/product';
    import priceApi from '@/libs/apis/price';

    export default {
        computed: {
            productID() {
                return this.$route.params.id;
            },
        },
        data() {
            return {
                categories: [],
                items: [],
                product: '',
                title: '',
                imageUrl: '',
                desc: '',
                category: '',
                item: '',
                prices: [],
                price: '',
                source: '',
                selectedPrice: null,
                priceModalShown: false,
            };
        },

        methods: {
            onSelectPrice(price) {
                this.selectedPrice = price;
            },
            async onEditProduct(e) {
                e.preventDefault();
                const { product } = this;
                const state = confirm('Do you want to Save?');
                if (state) {
                    const result = await productApi.update(product._id, {
                        title: product.title,
                        category: product.category,
                        item: product.item,
                        imageUrl: product.imageUrl,
                        desc: product.desc,
                    });

                    if (result.error) {
                        alert(result.error);
                        return;
                    }

                    this.product = await productApi.findById(this.productID);
                }
            },

            async onEditPrice(e) {
                e.preventDefault();
                const { selectedPrice } = this;
                const state = confirm('Are you sure to Edit?');
                if (state) {
                    var id = selectedPrice._id;
                    var price = selectedPrice.price;
                    var source = selectedPrice.source;

                    const result = await priceApi.edit({
                        id,
                        price,
                        source,
                    });

                    if (result.error) {
                        alert(result.error);
                        return;
                    }

                    this.prices = await priceApi.findByPid(this.productID);
                    this.price = this.source = '';
                }
            },
            async onAddPrice(e) {
                e.preventDefault();
                const { price, source, product } = this;
                const result = await priceApi.add({
                    price,
                    source,
                    product: product._id,
                });

                console.log(result);
                if (result.error) {
                    alert(result.error);
                    return;
                }
                this.priceModalShown = false;
                this.prices = await priceApi.findByPid(this.productID);
                this.price = this.source = '';
            },
            async onDelete() {
                const state = confirm('Are you sure to Delete?');
                if (state) {
                    const { selectedPrice } = this;
                    let result = await priceApi.remove(selectedPrice._id);
                    if (result.error) {
                        alert(result.error);
                        return;
                    }
                    this.prices = await priceApi.findByPid(this.productID);
                    this.selectedPrice = '';
                }
            },
        },

        async mounted() {
            this.product = await productApi.findById(this.productID);
            this.prices = await priceApi.findByPid(this.productID);
            this.items = await itemApi.all();
            this.categories = await categoryApi.all();
        },
    };
</script>

<template>
    <h2>Product Detail</h2>
    <form @submit="onEditProduct">
        <div class="flex gap-3 mb-3 border p-3">
            <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTkLIlNbmP7RdIoAUYU_N6H6JpVSSuulgYlqQ&usqp=CAU"
                alt=""
                style="width: 10rem; height: 10rem"
                class="border border-black border-2 rounded-circle"
            />
            <div class="flex flex-column w-50 align-self-center gap-2">
                <div class="flex gap-1">
                    <label for="pTitle">Title:</label>
                    <input
                        type="text"
                        name="title"
                        id="pTitle"
                        v-model="product.title"
                    />
                </div>
                <div class="flex gap-1">
                    <label for="pTitle">Category:</label>

                    <select
                        required
                        v-model="product.category"
                        name="category"
                        class="px-2 mx-2 rounded-sm bg-green-100"
                    >
                        <option
                            v-for="cate in categories"
                            :key="cate.name"
                            :value="cate._id"
                        >
                            {{ cate.name }}
                        </option>
                    </select>
                </div>
                <div class="flex gap-1">
                    <label for="pTitle">Item:</label>

                    <select
                        required
                        v-model="product.item"
                        name="item"
                        class="px-2 mx-2 rounded-sm bg-green-100"
                    >
                        <option
                            v-for="item in items"
                            :key="item.name"
                            :value="item._id"
                        >
                            {{ item.name }}
                        </option>
                    </select>
                </div>
                <div class="flex gap-1">
                    <label for="pTitle">Description:</label>
                    <input
                        type="text"
                        name="title"
                        id="pTitle"
                        v-model="product.desc"
                    />
                </div>
            </div>
            <div class="align-self-center">
                <button class="btn btn-info h-50" type="submit">Save</button>
            </div>
        </div>
    </form>

    <main class="relative">
        <div>
            <div class="flex justify-content-between mb-3">
                <h4>Product Prices</h4>
                <button
                    v-on:click="priceModalShown = true"
                    class="btn btn-primary"
                >
                    Add new Price
                </button>
            </div>
            <form @submit="onEditPrice">
                <table id="customers">
                    <tr class="bg-gray-200">
                        <th>Price</th>
                        <th>Source</th>
                        <th>Action</th>
                    </tr>

                    <tr
                        v-for="price in prices"
                        :key="price._id"
                    >
                        <td>
                            <input
                                class="border border-2"
                                type="number"
                                v-model="price.price"
                            />$
                        </td>
                        <td>
                            <input
                                class="border border-2"
                                type="text"
                                v-model="price.source"
                            />
                        </td>
                        <td>
                            <div class="flex flex-col space-y-2">
                                <button
                                    @click="onSelectPrice(price)"
                                    type="submit"
                                    class="btn btn-secondary"
                                >
                                    Edit
                                </button>
                                <div
                                    v-on:click="
                                        onSelectPrice(price), onDelete()
                                    "
                                    class="btn btn-danger hover:font-bold"
                                >
                                    Delete
                                </div>
                            </div>
                        </td>
                    </tr>
                </table>
            </form>
        </div>

        <div
            id="overlay"
            v-if="priceModalShown"
            class="popupForm flex justify-center items-center absolute top-0 left-0 bottom-0 right-0"
        >
            <div class="w-72 h-96 bg-white rounded-lg shadow-md">
                <form
                    @submit="onAddPrice"
                    method="post"
                >
                    <div class="h-full w-full flex flex-col">
                        <div class="flex flex-grow-0 relative p-2 py-3">
                            <div class="font-bold text-center w-full">
                                {{ selectedProduct?.title }}
                            </div>
                        </div>
                        <div class="w-full flex flex-grow p-2">
                            <div class="w-full flex flex-col space-y-3">
                                <div class="border">
                                    <input
                                        required
                                        v-model="price"
                                        class="w-full h-10 px-1"
                                        type="number"
                                        placeholder="Price"
                                    />
                                </div>
                                <div class="border">
                                    <input
                                        required
                                        v-model="source"
                                        class="w-full h-10 px-1"
                                        type="text"
                                        placeholder="Source"
                                    />
                                </div>
                            </div>
                        </div>
                        <div
                            class="flex flex-grow-0 py-1 justify-center space-x-2"
                        >
                            <button
                                v-on:click="priceModalShown = false"
                                class="p-2 px-3 text-gray-500 rounded-md cursor-pointer border border-gray-100"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                class="bg-blue-500 p-2 px-3 text-white rounded-md cursor-pointer"
                            >
                                Add
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    </main>
</template>

<style scoped>
    @import 'bootstrap/dist/css/bootstrap.css';
    #overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.5); /* Semi-transparent background */
        backdrop-filter: blur(1px); /* Blurring effect */
    }
</style>
