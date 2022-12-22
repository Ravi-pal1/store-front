import {
  ProductOptionsProvider,
  MediaFile,
  useProductOptions,
  ProductPrice,
  BuyNowButton,
  AddToCartButton,
} from "@shopify/hydrogen";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

export default function ProductDetails({ product }) {
  return (
    <section className="mt-2">
      <ProductOptionsProvider data={product}>
        <div className="flex justify-between flex-wrap mx-auto lg:w-10/12">
          <div className="lg:w-2/5 mx-auto">
            <ProductGallery media={product.media.nodes} />
          </div>
          <div className="lg:w-3/5 mt-8 lg:mt-0">
            <div className="lg:w-4/5 lg:mx-auto mt-4 px-2">
              <p className="text-3xl font-bold">{product.title}</p>
              <p className="text-gray-500 mb-4">{product.vendor}</p>
              <div className="lg:w-3/5">
                <ProductForm product={product} />
              </div>
              <div className="mt-8">
                <h3 className="text-xl font-bold">Description</h3>
                <div
                  className="prose border-t border-gray-200 pt-6 text-black text-md"
                  dangerouslySetInnerHTML={{ __html: product.descriptionHtml }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </ProductOptionsProvider>
    </section>
  );
}

function ProductForm({ product }) {
  const { options, selectedVariant } = useProductOptions();
  return (
    <form className="grid gap-10">
      {
        <div className="grid gap-4">
          {options.map(({ name, values }) => {
            if (values.length === 1) {
              return null;
            }
            return (
              <div
                key={name}
                className="flex flex-wrap items-baseline justify-start gap-6"
              >
                <legend className="whitespace-pre-wrap max-w-prose font-bold text-lead min-w-[4rem]">
                  {name}
                </legend>
                <div className="flex flex-wrap items-baseline gap-4">
                  <OptionRadio name={name} values={values} />
                </div>
              </div>
            );
          })}
        </div>
      }
      <div>
        <ProductPrice
          className="text-gray-500 line-through text-lg font-semibold"
          priceType="compareAt"
          variantId={selectedVariant.id}
          data={product}
        />
        <ProductPrice
          className="text-gray-900 text-lg font-semibold"
          variantId={selectedVariant.id}
          data={product}
        />
      </div>
      <div className="grid items-stretch gap-4">
        <PurchaseMarkup />
      </div>
    </form>
  );
}

function PurchaseMarkup() {
  const { selectedVariant } = useProductOptions();
  const isOutOfStock = !selectedVariant?.availableForSale || false;
  return (
    <>
      <AddToCartButton
        type="button"
        variantId={selectedVariant.id}
        quantity={1}
        accessibleAddingToCartLabel="Adding item to your cart"
        disabled={isOutOfStock}
      >
        <span className="bg-black text-white inline-block rounded-sm font-medium text-center py-3 px-6 max-w-xl leading-none w-full">
          {isOutOfStock ? "Sold out" : "Add to cart"}
        </span>
      </AddToCartButton>
      {isOutOfStock ? (
        <span className="text-black text-center py-3 px-6 border rounded leading-none ">
          Available in 2-3 weeks
        </span>
      ) : (
        <BuyNowButton variantId={selectedVariant.id}>
          <span className=" bg-violet-600 text-white inline-block rounded font-medium text-center py-3 px-6 max-w-xl leading-none border w-full">
            Buy it now
          </span>
        </BuyNowButton>
      )}
    </>
  );
}

function OptionRadio({ values, name }) {
  const { selectedOptions, setSelectedOption } = useProductOptions();
  return (
    <>
      {values.map((value) => {
        const checked = selectedOptions[name] === value;
        const id = `option-${name}-${value}`;
        return (
          <label key={id} htmlFor={id}>
            <input
              className="sr-only"
              type="radio"
              id={id}
              name={`option[${name}]`}
              value={value}
              checked={checked}
              onChange={() => setSelectedOption(name, value)}
            />
            <div
              className={`leading-none border-b-[2px] py-1 cursor-pointer transition-all duration-200 ${
                checked ? "border-gray-500" : "border-neutral-50"
              }`}
            >
              {value}
            </div>
          </label>
        );
      })}
    </>
  );
}

function ProductGallery({ media }) {
  if (!media.length) {
    return null;
  }
  const settings = {
    infinite: true,
    dots: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    lazyLoad: true,
    autoplay: false,
    arrows: false,
  };
  return (
    <div>
      <Slider
        {...settings}
        className="lg:w-full  mx-auto lg:h-full h-[500px] w-[400px]"
      >
        {media.map((med, i) => {
          let extraProps = {};
          if (med.mediaContentType === "MODEL_3D") {
            extraProps = {
              interactionPromptThreshold: "0",
              ar: true,
              loading: "eager",
              disableZoom: true,
            };
          }
          const data = {
            ...med,
            image: {
              ...med.image,
              altText: med.alt || "Product image",
            },
          };
          return (
            <div key={i} className="lg:w-[400px] lg:h-[550px]">
              <MediaFile
                data={data}
                className="w-full h-full object-contain"
                {...extraProps}
              />
            </div>
          );
        })}
      </Slider>
    </div>
  );
}
