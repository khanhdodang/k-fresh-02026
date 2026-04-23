import { test } from '../../pages/base-page';
import { Constants } from '../../utilities/constants';
import { Messages } from '../../data/messages.data';
import { UserProfile } from '../../models/user';
import { generateUserProfileData } from '../../data/user-data';
import { Product } from '../../models/product';
import { getEnvProduct } from '../../data/product.helper';

const product: Product = getEnvProduct();
let userProfile: UserProfile;

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
    await productPage.commonPage.goto(Constants.PRODUCT_PAGE_URL);
    await productPage.increaseQuantity(product);
    await productPage.clickAddToCart();
    await productPage.verifyAddToCartSuccessMessage(
      Messages.ADD_TO_CART_SUCCESS_MESSAGE,
    );
    await productPage.clickViewCartLink();
    await cartPage.verifyProductAddedToCart(product);
  });

  test('TC03 - Remove Product from Cart', async ({ productPage, cartPage }) => {
    await productPage.commonPage.goto(Constants.PRODUCT_PAGE_URL);
    await productPage.clickAddToCart();
    await productPage.verifyAddToCartSuccessMessage(
      Messages.ADD_TO_CART_SUCCESS_MESSAGE,
    );
    await productPage.clickViewCartLink();
    await cartPage.clickRemoveProduct(product);
    await cartPage.verifyProductRemovedFromCart(product);
  });

  test('TC04 - Update Product Quantity', async ({ productPage, cartPage }) => {
    await productPage.commonPage.goto(Constants.PRODUCT_PAGE_URL);
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
    await productPage.commonPage.goto(Constants.PRODUCT_PAGE_URL);
    await productPage.clickAddToCart();
    await productPage.verifyAddToCartSuccessMessage(
      Messages.ADD_TO_CART_SUCCESS_MESSAGE,
    );
    await productPage.clickViewCartLink();
    const productWithZeroQty = { ...product, quantity: 0 };
    await cartPage.updateProductQuantity(productWithZeroQty);
    await cartPage.verifyProductRemovedFromCart(product);
  });
});
