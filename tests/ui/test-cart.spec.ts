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
    await cartPage.clickRemoveProduct();
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
      await homePage.commonPage.goto(Constants.BASE_URL);
      await homePage.selectProduct(product.name);
      await productPage.clickAddToCart();
      await cartPage.clickCartButton();
  });

  test('TC_CART_02 - Add product with multiple quantity successfully', async ({ homePage, productPage, cartPage }) => {
      await homePage.commonPage.goto(Constants.BASE_URL);
      await homePage.selectProduct(product.name);
      await productPage.setQuantity(3);
      await productPage.clickAddToCart();
      await cartPage.clickCartButton();
  });

  test('TC_CART_03 - Add product to cart from homepage', async ({ homePage, productPage }) => {
      await homePage.commonPage.goto(Constants.BASE_URL);
      await homePage.hoverAndAddToCart(product.name);
      await productPage.clickViewCartLink();
  });

  test('TC_CART_04 - Update product quantity in cart successfully', async ({ homePage, productPage, cartPage }) => {
      await homePage.commonPage.goto(Constants.BASE_URL);
      await homePage.selectProduct(product.name);
      await productPage.clickAddToCart();
      await productPage.verifyAddToCartSuccessMessage(
        Messages.ADD_TO_CART_SUCCESS_MESSAGE,
      );
      await productPage.clickViewCartLink();
      await cartPage.clickCartButton();
      await cartPage.updateQuantity(2, product.name);
      await cartPage.clickUpdateQuantity(product.name);
  });
});
