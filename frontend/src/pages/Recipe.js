import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import Fade from 'react-reveal/Fade';

import sanityClient from '../client.js';

// Styling
import {
  InnerWrapper,
  BreadCrumbs,
  BackButton,
  FlexWrapperSpace,
  LoaderWrapper,
} from '../assets/GlobalStyles';

// Reducers
import { location } from '../reducers/location';

// ----------------------------------------------------------------

export const Recipe = () => {
  const currentLocation = useLocation();
  const dispatch = useDispatch();
  const { slug } = useParams();
  const [recipeData, setRecipeData] = useState(null);

  // For back-button & breadcrumbs
  const history = useHistory();

  // Fetch story data
  useEffect(() => {
    window.scrollTo(0, 0);
    dispatch(location.actions.setLocation(currentLocation.pathname));

    sanityClient
      .fetch(
        `*[slug.current == "${slug}"]{
            _id,
            title,
            slug,
            category,
            portions,
            creator,
            "main_image":main_image.asset->{url, tags, title},
            secondary_byline,
            intro,
            ingredients,
            toppings,
            "steps" : steps[] {"image":asset->{tags,url, alt}, "text": text},
           }`
      )
      .then((data) => setRecipeData(data[0]))
      .catch(console.error);
  }, [dispatch, currentLocation.pathname, slug]);

  if (!recipeData) {
    return (
      <LoaderWrapper>
        <p>Loading...</p>
      </LoaderWrapper>
    );
  }
  return (
    <Fade>
      {/* Top-bar (breadcrumbs + nav) */}
      <RecipeTopWrapper>
        <FlexWrapperSpace>
          <BackButton onClick={history.goBack}>Tillbaka</BackButton>
          <BreadCrumbs>Recept · {recipeData.title}</BreadCrumbs>
        </FlexWrapperSpace>
      </RecipeTopWrapper>

      {/* Header */}
      <RecipeHeaderWrapper>
        <MainImage src={recipeData.main_image.url} />
        <RecipeHeaderTextWrapper>
          <RecipeIntro>{recipeData.intro}</RecipeIntro>
          <RecipeCategory>{recipeData.category}</RecipeCategory>
          <RecipeTitle>{recipeData.title}</RecipeTitle>
          {recipeData.secondary_byline && (
            <RecipeByline>{recipeData.secondary_byline}</RecipeByline>
          )}
        </RecipeHeaderTextWrapper>
      </RecipeHeaderWrapper>

      <RecipeMainWrapper>
        {/* Ingredients */}
        <Ingredients>
          {recipeData.portions && <Portions>{recipeData.portions}</Portions>}
          <IngredientsList>
            <li style={{ fontStyle: 'italic' }}>Ingredienser:</li>
            {recipeData.ingredients &&
              recipeData.ingredients.map((ingredient, index) => {
                return <li key={index}>{ingredient}</li>;
              })}
            {recipeData.toppings && (
              <li style={{ fontStyle: 'italic', marginTop: '20px' }}>
                Toppings:
              </li>
            )}
            {recipeData.toppings &&
              recipeData.toppings.map((topping, index) => {
                return <li key={index}>{topping}</li>;
              })}
          </IngredientsList>
        </Ingredients>

        {/* Steps */}
        <Steps>
          <StepsList>
            <p>Gör såhär:</p>
            {recipeData.steps &&
              recipeData.steps.map((step, index) => {
                if (step.text) {
                  return <li key={index}>{step.text}</li>;
                }
                if (step.image) {
                  return (
                    <img
                      key={index}
                      src={step.image.url}
                      alt={step.image.alt ? step.image.alt : 'Recipe image'}
                    />
                  );
                }
                return null;
              })}
          </StepsList>
        </Steps>
      </RecipeMainWrapper>
      <FlexWrapperSpace
        style={{ width: '80vw', maxWidth: '800px', margin: '0 auto 100px' }}
      >
        <BackButton onClick={history.goBack}>Tillbaka</BackButton>
        <BreadCrumbs>Recept · {recipeData.title}</BreadCrumbs>
      </FlexWrapperSpace>
    </Fade>
  );
};

// ----------------------------------------------------------------

const RecipeTopWrapper = styled(InnerWrapper)`
  margin: 150px auto 0 auto;

  @media (max-width: 900px) {
    margin: 100px auto 0 auto;
  }
`;

const RecipeHeaderWrapper = styled.div`
  display: flex;
  align-items: flex-end;

  @media (max-width: 900px) {
    flex-direction: column;
    align-items: center;
  }
`;

const RecipeHeaderTextWrapper = styled.div`
  width: 40vw;
  max-width: 400px;
  margin-top: 50px;
  margin-left: 30px;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    width: 80vw;
    max-width: 80vw;
    margin: 50px 0 0 0;
  }
`;

const RecipeMainWrapper = styled(InnerWrapper)`
  display: flex;
  align-items: flex-start;
  margin: 60px auto 20px;

  @media (max-width: 900px) {
    width: 80vw;
    flex-direction: column;
    margin-top: 0;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const MainImage = styled.img`
  margin-top: 50px;
  width: 50vw;
  height: 600px;
  object-fit: cover;

  @media (max-width: 900px) {
    width: 100vw;
    margin-top: 30px;
  }
`;

const Portions = styled.p`
  text-align: right;
  margin-bottom: 20px;
  margin-right: 40px;
`;

const Ingredients = styled.div`
  width: 600px;
  margin-top: 50px;

  @media (max-width: 900px) {
    width: 80vw;
    width: 100%;
    margin-top: 20px;
  }
`;

const IngredientsList = styled.ul`
  list-style-type: none;

  li {
    line-height: 1.6;
    text-align: right;
    margin-right: 40px;

    @media (max-width: 900px) {
      text-align: left;
    }
  }
`;

const Steps = styled.div`
  line-height: 1.6;
`;

const StepsList = styled.ol`
  margin-left: 30px;
  list-style-position: inside;

  @media (max-width: 900px) {
    margin: 50px 0;
  }

  img {
    width: 100%;
    max-height: 373px;
    object-fit: cover;
    object-position: 50% 50%;
    margin: 20px 0;
  }

  li {
    margin: 20px 0;
  }

  p {
    font-style: italic;
  }
`;

const RecipeTitle = styled.h1`
  font-weight: 300;
  font-size: 46px;

  @media (max-width: 900px) {
    font-size: 38px;
  }
`;

const RecipeCategory = styled.p`
  font-family: 'Pearl';
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const RecipeIntro = styled.p`
  margin-bottom: 40px;
  max-width: 80%;
  font-size: 18px;
  line-height: 1.5;
  font-style: italic;
  margin-right: 50px;

  @media (max-width: 900px) {
    max-width: 100%;
    margin-right: 0;
  }
`;

const RecipeByline = styled.p`
  margin-top: 10px;
  font-size: 12px;
  font-style: italic;
  margin-right: 50px;

  @media (max-width: 900px) {
    font-size: 14px;
    margin-right: 0;
  }
`;
