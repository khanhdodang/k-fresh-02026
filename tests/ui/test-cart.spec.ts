import { test } from '../../pages/base-page';
import { Constants } from '../../utilities/constants';
import { Messages } from '../../data/messages.data';
import { UserProfile } from '../../models/user';
import { generateUserProfileData } from '../../data/user-data';
import { Product } from '../../models/product';
import { getEnvProduct } from '../../data/product.helper';

const product: Product = getEnvProduct();
let userProfile: UserProfile;

/** Test suite for cart-related tests */
test.describe('Cart Tests', () => {

  test.beforeEach(async ({ commonPage, registerPage }) => {
    userProfile = generateUserProfileData();
    await commonPage.goto(Constants.REGISTER_URL);
    await registerPage.fillRegistrationForm(userProfile);
    await registerPage.clickAgreeTermsCheckbox();
    await registerPage.submitRegistrationForm();
  });

  test('TC01 - Verify Empty Cart', async ({ cartPage }) => {
    await cartPage.commonPage.goto(Constants.BASE_URL);
    await cartPage.clickCartButton();
    await cartPage.clickEditCartButton();
    await cartPage.removeAllProducts();
    await cartPage.verifyMainCartIsEmpty(Messages.EMPTY_CART_MESSAGE);
  });

  test('TC02 - Add Product to Cart', async ({ productPage, cartPage }) => {
    await productPage.commonPage.goto(Constants.BASE_URL);
    await productPage.searchAndSelectProduct(product);
    await productPage.increaseQuantity(product);
    await productPage.clickAddToCart();
    await productPage.verifyAddToCartSuccessMessage(Messages.ADD_TO_CART_SUCCESS_MESSAGE);
    await productPage.clickViewCartLink();
    await cartPage.verifyProductAddedToCart(product);
  });

  test('TC03 - Remove Product from Cart', async ({ productPage, cartPage }) => {
    await productPage.commonPage.goto(Constants.BASE_URL);
    await productPage.searchAndSelectProduct(product);
    await productPage.clickAddToCart();
    await productPage.verifyAddToCartSuccessMessage(Messages.ADD_TO_CART_SUCCESS_MESSAGE);
    await productPage.clickViewCartLink();
    await cartPage.clickRemoveProduct(product);
    await cartPage.verifyProductRemovedFromCart(product);
  });

  test('TC04 - Update Product Quantity', async ({ productPage, cartPage }) => {
    await productPage.commonPage.goto(Constants.BASE_URL);
    await productPage.searchAndSelectProduct(product);
    await productPage.clickAddToCart();
    await productPage.verifyAddToCartSuccessMessage(
      Messages.ADD_TO_CART_SUCCESS_MESSAGE,
    );
    await productPage.clickViewCartLink();
    await cartPage.updateProductQuantity(product);
    await cartPage.verifyCartModifiedSuccessMessage(Messages.UPDATE_CART_SUCCESS_MESSAGE);
    await cartPage.verifyUpdatedProductQuantity(product);
  });

  test('TC05 - Update Product Quantity to 0 (Remove via Quantity)', async ({ productPage, cartPage }) => {
    await productPage.commonPage.goto(Constants.BASE_URL);
    await productPage.searchAndSelectProduct(product);
    await productPage.clickAddToCart();
    await productPage.verifyAddToCartSuccessMessage(Messages.ADD_TO_CART_SUCCESS_MESSAGE,);
    await productPage.clickViewCartLink();
    const productWithZeroQty = { ...product, quantity: 0 };
    await cartPage.updateProductQuantity(productWithZeroQty);
    await cartPage.verifyProductRemovedFromCart(product);
  });
  
  /** Test case Add-to-Cart of PThao */
  test('TC_CART_01 - Add product to cart', async ({ homePage, productPage, cartPage }) => {

    /** Navigate to homepage */
    await test.step('Navigate to homepage', async () => {
      await homePage.commonPage.goto(Constants.BASE_URL);
    });

    /** Select product from homepage and open product detail page */
    await test.step('Select product from homepage and open product detail page', async () => {
      await homePage.selectProduct(product.name);
    });

    /** Add product to cart */
    await test.step('Add product to cart', async () => {
      await productPage.clickAddToCart();
    });

    /** Open cart page */
    await test.step('Open cart page', async () => {
      await cartPage.clickCartButton();
    });
  });

  test('TC_CART_02 - Add product with multiple quantity successfully', async ({ homePage, productPage, cartPage }) => {
    /** Navigate to homepage */
    await test.step('Navigate to homepage', async () => {
      await homePage.commonPage.goto(Constants.BASE_URL);
    });

    /** Select product from homepage and open product detail page */
    await test.step('Select product from homepage and open product detail page', async () => {
      await homePage.selectProduct(product.name);
    });

    await test.step('Enter product quantity', async () => {
      await productPage.setQuantity(product.quantity);
    });

    /** Add product to cart */
    await test.step('Add product to cart', async () => {
      await productPage.clickAddToCart();
    });

    /** Open cart page */
    await test.step('Open cart page', async () => {
      await cartPage.clickCartButton();
    });
  });

  test('TC_CART_03 - Add product to cart from homepage', async ({ homePage, cartPage }) => {
    /** Navigate to homepage */
    await test.step('Navigate to homepage', async () => {
      await homePage.commonPage.goto(Constants.BASE_URL);
    });

    /** Select product card and add to cart */
    await test.step('Select product card and add to cart', async () => {
      await homePage.hoverAndAddToCart(product.name);
    });

    /** Open cart page */
    await test.step('Open cart page', async () => {
      await cartPage.clickViewCartLink();
    });
  });

  test('TC_CART_04 - Update product quantity in cart successfully', async ({ homePage, productPage, cartPage }) => {
    /** Navigate to homepage */
    await test.step('Navigate to homepage', async () => {
      await homePage.commonPage.goto(Constants.BASE_URL);
    });

    /** Select product card */
    await test.step('Select product card and add to cart', async () => {
      await homePage.selectProduct(product.name);
    });

    /** Add product to cart */
    await test.step('Add product to cart', async () => {
      await productPage.clickAddToCart();
      await productPage.verifyAddToCartSuccessMessage(
        Messages.ADD_TO_CART_SUCCESS_MESSAGE,
      );
      await productPage.clickViewCartLink();
    });

    /** Open cart page */
    await test.step('Open cart page to verify update', async () => {
      await cartPage.clickCartButton();
    });

    /** Update product quantity in product detail page */
    await test.step('Update product quantity', async () => {
      await cartPage.updateQuantity(2, product.name);
      await cartPage.clickUpdateQuantity(product.name);
    });
  });
});
