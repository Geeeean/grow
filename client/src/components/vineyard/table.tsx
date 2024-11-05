import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Vineyard, vineyardAction, VineyardId } from '@/types/vineyard';
import VineyardVarietyTooltip from './variety-tooltip';
import { Link, useNavigate } from '@tanstack/react-router';
import { Button } from '../ui/button';
import { Eye } from 'lucide-react';
import { useMediaQuery } from '@/hooks/use-media-query';
import VineyardActionsDropdown from './actions-dropdown';
import { Dispatch, SetStateAction } from 'react';
import { action } from '@/types/shared';

type Props = {
    vineyards: Vineyard[];
    setSelectedVineyard: Dispatch<SetStateAction<VineyardId>>;
    getVineyardActionSetter: (action: vineyardAction) => React.Dispatch<React.SetStateAction<boolean>>;
    getActionSetter: (action: action) => Dispatch<SetStateAction<boolean>>;
};

const VineyardsTable = ({ vineyards, setSelectedVineyard, getVineyardActionSetter, getActionSetter }: Props) => {
    const isDesktop = useMediaQuery('(min-width: 768px)');
    const navigate = useNavigate();

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableHead className="hidden w-[100px] sm:table-cell">
                        <span className="sr-only">img</span>
                    </TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Soil type</TableHead>
                    <TableHead>Total plants</TableHead>
                    <TableHead className="hidden md:table-cell">Altitude</TableHead>
                    <TableHead className="hidden md:table-cell">Varieties</TableHead>
                    <TableHead className="hidden md:table-cell">
                        <span className="sr-only">Actions</span>
                    </TableHead>
                    <TableHead className="hidden md:table-cell">
                        <span className="sr-only">Open</span>
                    </TableHead>
                </TableRow>
            </TableHeader>
            <TableBody>
                {vineyards.map((vineyard: Vineyard, index: number) => (
                    <TableRow
                        key={index}
                        onClick={() => {
                            if (!isDesktop) {
                                navigate({
                                    to: `/vineyards/${vineyard.id}`,
                                    search: { bcLast: vineyard.name },
                                });
                            }
                        }}
                    >
                        <TableCell className="hidden sm:table-cell">
                            <div className="w-16 h-16 rounded-md bg-muted"></div>
                        </TableCell>
                        <TableCell className="font-medium">{vineyard.name}</TableCell>
                        <TableCell>
                            <Badge variant="outline">{vineyard.soil}</Badge>
                        </TableCell>
                        <TableCell>{vineyard.plants}</TableCell>
                        <TableCell className="hidden md:table-cell">{vineyard.altitude}m</TableCell>
                        <TableCell className="hidden md:table-cell">
                            <VineyardVarietyTooltip varieties={vineyard.varieties} full={false} />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            <VineyardActionsDropdown
                                vineyardId={vineyard.id}
                                setSelectedVineyard={setSelectedVineyard}
                                getVineyardActionSetter={getVineyardActionSetter}
                                getActionSetter={getActionSetter}
                            />
                        </TableCell>
                        <TableCell className="hidden md:table-cell">
                            <Link
                                aria-label="Open Vineyard"
                                to={`/vineyards/${vineyard.id}`}
                                search={{ bcLast: vineyard.name }}
                            >
                                <Button variant="ghost">
                                    <Eye />
                                </Button>
                            </Link>
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
};

export default VineyardsTable;
