import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useParams, useHistory, useLocation } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import sanityClient from '../client.js';

// Styling
import {
  InnerWrapper,
  BreadCrumbs,
  BackButton,
  FlexWrapper,
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
  const formattedLocation = currentLocation.pathname
    .substring(1)
    .replaceAll('/', ' · ')
    .replaceAll('-', ' ');

  // Fetch story data
  useEffect(() => {
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
            "steps" : steps[] {"image":asset->{tags,url}, "text": text},
           }`
      )
      .then((data) => setRecipeData(data[0]))
      .catch(console.error);
  }, []);

  console.log(recipeData);

  if (!recipeData) {
    return (
      <InnerWrapper>
        <p>Loading...</p>
      </InnerWrapper>
    );
  }
  return (
    <>
      {/* Top-bar (breadcrumbs + nav) */}
      <RecipeTopWrapper>
        <FlexWrapper>
          <BackButton onClick={history.goBack}>Tillbaka</BackButton>
          <BreadCrumbs>Food · {recipeData.title}</BreadCrumbs>
        </FlexWrapper>
      </RecipeTopWrapper>

      {/* Header */}
      <RecipeHeaderWrapper>
        <MainImage src={recipeData.main_image.url} />
        <RecipeHeaderTextWrapper>
          <RecipeIntro>{recipeData.intro}</RecipeIntro>
          <RecipeCategory>{recipeData.category}</RecipeCategory>
          <RecipeTitle>{recipeData.title}</RecipeTitle>
          {recipeData.secondary_byline && (
            <RecipeByline>Byline: {recipeData.secondary_byline}</RecipeByline>
          )}
        </RecipeHeaderTextWrapper>
      </RecipeHeaderWrapper>

      <RecipeMainWrapper>
        {/* Ingredients */}
        <Ingredients>
          <IngredientsList>
            <li style={{ fontStyle: 'italic' }}>Ingredienser:</li>
            {recipeData.ingredients &&
              recipeData.ingredients.map((ingredient, index) => {
                return <li key={index}>{ingredient}</li>;
              })}
          </IngredientsList>
        </Ingredients>

        {/* Steps */}
        <Steps>
          <StepsList>
            <p style={{ fontStyle: 'italic' }}>Gör såhär:</p>
            {recipeData.steps &&
              recipeData.steps.map((step, index) => {
                if (step.text) {
                  return <li key={index}>{step.text}</li>;
                }
                if (step.image) {
                  return <img key={index} src={step.image.url} />;
                }
                // return <li key={index}>{step}</li>;
              })}
          </StepsList>
        </Steps>
      </RecipeMainWrapper>
    </>
  );
};

// ----------------------------------------------------------------

const RecipeTopWrapper = styled(InnerWrapper)`
  margin: 150px auto 0;

  @media (max-width: 900px) {
    margin: 150px auto 0 auto;
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
  }
`;

const MainImage = styled.img`
  margin-top: 50px;
  width: 50vw;
  height: 600px;
  object-fit: cover;

  @media (max-width: 900px) {
    width: 100vw;
  }
`;

const RecipeMainWrapper = styled(InnerWrapper)`
  display: flex;
  align-items: flex-start;
  padding-bottom: 50px;

  @media (max-width: 900px) {
    width: 80vw;

    flex-direction: column;
    margin-top: 0;
    margin-bottom: 0;
    padding-bottom: 0;
  }
`;

const Ingredients = styled.div`
  width: 400px;
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
    font-family: 'Fraunces';
    line-height: 1.6;
    text-align: right;
    margin-right: 40px;

    @media (max-width: 900px) {
      text-align: left;
    }
  }
`;

const Steps = styled.div`
  font-family: 'Fraunces';
  line-height: 1.6;
`;

const StepsList = styled.ol`
  margin-left: 30px;
  list-style-position: inside;

  @media (max-width: 900px) {
    margin-left: 0;
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
`;

const RecipeTitle = styled.h1`
  font-family: 'Fraunces';
  font-weight: 300;
  font-size: 46px;

  @media (max-width: 900px) {
    font-size: 32px;
  }
`;

const RecipeCategory = styled.p`
  font-family: 'Pearl';
  text-transform: uppercase;
  margin-bottom: 10px;
`;

const RecipeIntro = styled.p`
  font-family: 'Fraunces';
  margin-bottom: 40px;
  max-width: 60%;
  font-size: 18px;
  line-height: 1.5;
  font-style: italic;
  margin-right: 50px;

  @media (max-width: 900px) {
    max-width: 100%;
  }
`;

const RecipeByline = styled.p`
  font-family: 'Fraunces';
  margin-top: 10px;
  font-size: 10px;
  font-style: italic;
  margin-right: 50px;
`;
