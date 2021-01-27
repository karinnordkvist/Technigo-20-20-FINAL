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
            "thumbnail":thumbnail.asset->{url, tags, title},
            creator,
            "main_image":main_image.asset->{url, tags, title},
            secondary_byline,
            intro,
            ingredients,
            toppings,
            steps,
            "test_steps" : test_steps[] {"image":asset->{tags,url}, "text": text},
            break_out_text,
            "images": images[] {"image":asset->{tags, url}}.image
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
      <RecipeTopWrapper>
        <FlexWrapper>
          <BackButton onClick={history.goBack}>Tillbaka</BackButton>
          <BreadCrumbs>Food · {recipeData.title}</BreadCrumbs>
        </FlexWrapper>
      </RecipeTopWrapper>
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
        <Ingredients>
          <IngredientsList>
            <li style={{ fontStyle: 'italic' }}>Ingredienser:</li>
            {recipeData &&
              recipeData.ingredients.map((ingredient) => {
                return <li key={ingredient}>{ingredient}</li>;
              })}
          </IngredientsList>
        </Ingredients>
        {/* <Steps>
          <StepsList>
            {recipeData.steps.map((step, index) => {
              return <li key={index}>{step}</li>;
            })}
          </StepsList>
        </Steps> */}
        <Steps>
          <StepsList>
            {recipeData &&
              recipeData.test_steps.map((step, index) => {
                if (step.text) {
                  return <li key={index}>{step.text}</li>;
                }
                if (step.image) {
                  return <img src={step.image.url} />;
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
`;

const RecipeHeaderWrapper = styled.div`
  display: flex;
  align-items: flex-end;
`;

const RecipeHeaderTextWrapper = styled.div`
  width: 40vw;
  max-width: 600px;
  margin-top: 50px;
  margin-left: 30px;
  display: flex;
  flex-direction: column;
`;

const MainImage = styled.img`
  margin-top: 50px;
  width: 50vw;
`;

const RecipeMainWrapper = styled(InnerWrapper)`
  display: flex;
  align-items: flex-start;
  margin-bottom: 50px;
`;

const Ingredients = styled.div`
  width: 400px;
  margin-top: 50px;
`;

const IngredientsList = styled.ul`
  list-style-type: none;

  li {
    font-family: 'Fraunces';
    line-height: 1.6;
    text-align: right;
    margin-right: 40px;
  }
`;

const Steps = styled.div`
  font-family: 'Fraunces';
  line-height: 1.6;
`;
const StepsList = styled.ol`
  margin-left: 30px;

  img {
    max-width: 100%;
    margin: 20px 0;
  }
  li {
  }
`;

const RecipeTitle = styled.h1`
  font-family: 'Fraunces';
  font-weight: 300;
  font-size: 46px;
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
`;

const RecipeByline = styled.p`
  font-family: 'Fraunces';
  margin-top: 10px;
  font-size: 10px;
  font-style: italic;
  margin-right: 50px;
`;
