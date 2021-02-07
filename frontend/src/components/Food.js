import React, { useState, useEffect } from 'react';
import styled from 'styled-components/macro';
import { useLocation, Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import sanityClient from '../client.js';

// Styling
import { InnerWrapper } from '../assets/GlobalStyles';

// Reducers
import { location } from '../reducers/location';

// ----------------------------------------------------------------

export const Food = () => {
  const currentLocation = useLocation();
  const dispatch = useDispatch();
  const [recipe, setRecipe] = useState(null);

  // Fetch recipe
  useEffect(() => {
    dispatch(location.actions.setLocation(currentLocation.pathname));

    sanityClient
      .fetch(
        `*[_type == 'recipe']{
          _id,
          title,
          category,
          slug,
          "thumbnail":thumbnail.asset->{url, tags, title},
          creator,
          secondary_byline,
          intro,
         }`
      )
      .then((data) => setRecipe(data))
      .catch(console.error);
  }, [dispatch, currentLocation.pathname]);

  if (!recipe) {
    return (
      <InnerWrapper>
        <p>Loading...</p>
      </InnerWrapper>
    );
  }
  return (
    <FoodInnerWrapper>
      <FoodIntro>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Dictum
        consectetur ultrices turpis lectus. Amet commodo curabitur rutrum proin
        pulvinar rhoncus semper donec. Sit integer morbi vestibulum felis.
      </FoodIntro>
      <RecipesWrapper>
        {recipe &&
          recipe.map((recipe, index) => {
            return (
              <Recipe key={index}>
                <Link to={'/food/' + recipe.slug.current}>
                  <RecipeThumbnail src={recipe.thumbnail.url} />
                </Link>
                <RecipeCategory>{recipe.category}</RecipeCategory>
                <RecipeTitle to={'/food/' + recipe.slug.current}>
                  {recipe.title}
                </RecipeTitle>
              </Recipe>
            );
          })}
      </RecipesWrapper>
    </FoodInnerWrapper>
  );
};

// ----------------------------------------------------------------

const FoodInnerWrapper = styled(InnerWrapper)`
  margin: 150px auto;

  @media (max-width: 900px) {
    margin: 150px auto 0 auto;
  }
`;

const FoodIntro = styled.p`
  font-family: 'Fraunces';
  font-style: italic;
  font-size: 30px;
  font-weight: 300;
  line-height: 1.6;
  margin-bottom: 50px;

  @media (max-width: 900px) {
    font-size: 24px;
  }
`;

const RecipesWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 50px 20px;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }
`;

const Recipe = styled.div`
  img {
    max-width: 100%;
  }
`;

const RecipeThumbnail = styled.img`
  margin-bottom: 20px;
  width: 100%;
  height: 250px;
  object-fit: cover;
  object-position: 50% 50%;
`;

const RecipeTitle = styled(Link)`
  font-family: 'Fraunces';
  font-size: 20px;
  font-weight: 300;
  line-height: 1.2;
  text-transform: uppercase;
`;

const RecipeCategory = styled.p`
  font-size: 16px;
  font-family: 'Fraunces';
  font-style: italic;
  margin-bottom: 5px;

  &::after {
    content: ':';
  }
`;
