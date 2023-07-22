import { Button, Table, TableRow, TableCell, TableHead, TableBody, styled } from '@mui/material';
import { Link, useSearchParams } from 'react-router-dom';
import { categories } from '../../constants/data';

const StyledTable = styled(Table)`
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  background-color: #f6f6f6;
`;

const StyledButton = styled(Button)`
  background-color: #f9c233;
  color: #fff;
  margin: 16px;
  font-size: 20px;
  width: 85%;
  &:hover {
    background-color: #e57852;
  }
`;

const NoUnderlineLink = styled(Link)`
  text-decoration: none;
  color: inherit;
  
`;

const CategoryRow = styled(TableRow)`
  &:hover {
    background-color: #e2e2e2;
    cursor: pointer;
  }
`;

const Categories = () => {
  const [searchParams] = useSearchParams();
  const category = searchParams.get('category');

  return (
    <>
      <NoUnderlineLink to={`/create?category=${category || ''}`}>
        <StyledButton>Create Blog</StyledButton>
      </NoUnderlineLink>

      <StyledTable>
        <TableHead>
          <CategoryRow>
            <TableCell>
              <NoUnderlineLink to='/'>All Categories</NoUnderlineLink>
            </TableCell>
          </CategoryRow>
        </TableHead>
        <TableBody>
          {categories.map((category) => (
            <CategoryRow key={category.id}>
              <TableCell>
                <NoUnderlineLink to={`/?category=${category.type}`}>
                  {category.type}
                </NoUnderlineLink>
              </TableCell>
            </CategoryRow>
          ))}
        </TableBody>
      </StyledTable>
    </>
  );
};

export default Categories;
