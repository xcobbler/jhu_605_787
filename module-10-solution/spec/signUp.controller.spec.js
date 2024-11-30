describe("SignUpController", function() {

  var signUpController;
  var UserService;

  beforeEach(function () {
    module('restaurant');

    inject(function ($injector) {
      UserService = $injector.get('UserService');
    });
  });

  beforeEach(inject(function (_$controller_) {
    $controller = _$controller_;

    signUpController =
      $controller('SignUpController',
                  {
                    allMenuItems: {
                      "A": {
                        "category": {
                        "id": 82,
                        "name": "Soup",
                        "short_name": "A",
                        "special_instructions": ""
                        },
                        "menu_items": [
                          {
                          "description": "chicken-stuffed won tons in clear chicken broth with white meat chicken pieces and a few scallions",
                          "large_portion_name": "quart",
                          "name": "Won Ton Soup with Chicken",
                          "price_large": 5,
                          "price_small": 2.55,
                          "short_name": "A1",
                          "small_portion_name": "pint"
                          },
                          {
                          "description": "chicken broth with egg drop",
                          "large_portion_name": "quart",
                          "name": "Egg Drop Soup",
                          "price_large": 4.5,
                          "price_small": 2.25,
                          "short_name": "A2",
                          "small_portion_name": "pint"
                          }
                        ]
                      }
                    },
                    UserService: UserService
                  });
  }));

  it("valid menu item A1", function() {
    signUpController.user.favMenuItem = "A1";
    signUpController.processMenuItem();
    
    expect(signUpController.menuItemError).toBe("");
    expect(signUpController.user.favMenuItemDetails.categoryShortName).toBe("A");
    expect(signUpController.user.favMenuItemDetails.short_name).toBe("A1");
  });

  it("valid menu item A2", function() {
    signUpController.user.favMenuItem = "A2";
    signUpController.processMenuItem();
    
    expect(signUpController.menuItemError).toBe("");
    expect(signUpController.user.favMenuItemDetails.categoryShortName).toBe("A");
    expect(signUpController.user.favMenuItemDetails.short_name).toBe("A2");
  });

  it("missing menu item", function() {
    signUpController.user.favMenuItem = "Z1";
    signUpController.processMenuItem();
    
    expect(signUpController.menuItemError).toBe("No such menu number exists");
    expect(signUpController.user.favMenuItemDetails).toBe(undefined);
  });

  it("blank item", function() {
    signUpController.user.favMenuItem = "";
    signUpController.processMenuItem();
    
    expect(signUpController.menuItemError).toBe("Favorite Menu Item is required");
    expect(signUpController.user.favMenuItemDetails).toBe(undefined);
  });

});
