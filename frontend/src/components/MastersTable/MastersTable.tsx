import { useEffect, useState } from "react";
import {
  Alert,
  Box,
  Chip,
  CircularProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";

import { fetchMasters } from "../../api/mastersApi";
import type { Master } from "../../types";

const PAGE_SIZE = 2;

const STATUS_LABEL: Record<Master["status"], string> = {
  active: "Активен",
  unavailable: "Недоступен",
};

const STATUS_COLOR: Record<
  Master["status"],
  "success" | "default"
> = {
  active: "success",
  unavailable: "default",
};

export default function MastersTable() {
  const [items, setItems] = useState<Master[]>([]);
  const [page, setPage] = useState(1);
  const [total, setTotal] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    async function loadMasters() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchMasters(page, PAGE_SIZE);

        if (cancelled) return;

        setItems(response.items);
        setTotal(response.total);
      } catch {
        if (!cancelled) {
          setError("Не удалось загрузить список мастеров.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }

    void loadMasters();

    return () => {
      cancelled = true;
    };
  }, [page]);

  return (
    <Box
      sx={{
        width: "100%",
        minWidth: 0,
        color: "var(--ink)",
        "& .MuiTypography-root": {
          fontFamily: "Manrope, Arial, sans-serif",
        },
      }}
    >
      <Box sx={{ mb: 4 }}>
        <Typography
          component="div"
          sx={{
            mb: 1.5,
            color: "var(--rose-dark)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.18em",
            textTransform: "uppercase",
          }}
        >
          Управление каталогом
        </Typography>

        <Typography
          component="h1"
          sx={{
            m: 0,
            fontFamily: "'Playfair Display', Georgia, serif !important",
            fontSize: { xs: 38, sm: 48 },
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: "-0.045em",
          }}
        >
          Мастера <Box component="span" sx={{ color: "var(--rose-dark)" }}>сервиса</Box>
        </Typography>

        <Typography
          sx={{
            mt: 1.5,
            color: "var(--muted)",
            fontSize: 14,
            lineHeight: 1.7,
          }}
        >
          Список специалистов, их специализация и рейтинг.
        </Typography>
      </Box>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 2,
          flexWrap: "wrap",
          mb: 2,
        }}
      >
        <Typography sx={{ color: "var(--muted)", fontSize: 12 }}>
          Всего мастеров: <Box component="strong" sx={{ color: "var(--ink)" }}>{total}</Box>
        </Typography>

        <Typography sx={{ color: "var(--muted)", fontSize: 11 }}>
          Страница {page} из {Math.max(1, Math.ceil(total / PAGE_SIZE))}
        </Typography>
      </Box>

      {error && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {error}
        </Alert>
      )}

      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          width: "100%",
          border: "1px solid var(--line)",
          borderRadius: "3px",
          backgroundColor: "var(--paper)",
          overflowX: "auto",
          "& .MuiTableCell-root": {
            borderColor: "var(--line)",
            fontFamily: "Manrope, Arial, sans-serif",
          },
          "& .MuiTableHead-root .MuiTableCell-root": {
            py: 2,
            backgroundColor: "#f5eeeb",
            color: "var(--muted)",
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: "0.06em",
            textTransform: "uppercase",
            whiteSpace: "nowrap",
          },
          "& .MuiTableBody-root .MuiTableCell-root": {
            py: 2,
            color: "var(--ink)",
            fontSize: 12,
          },
          "& .MuiTableBody-root .MuiTableRow-root:last-child .MuiTableCell-root": {
            borderBottom: 0,
          },
          "& .MuiTableBody-root .MuiTableRow-root:hover": {
            backgroundColor: "#fbf5f3",
          },
        }}
      >
        <Table sx={{ minWidth: 720 }} aria-label="Список мастеров">
          <TableHead>
            <TableRow>
              <TableCell>Мастер</TableCell>
              <TableCell>Район</TableCell>
              <TableCell>Специализация</TableCell>
              <TableCell align="center">Рейтинг</TableCell>
              <TableCell>Статус</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={5} align="center" sx={{ py: 6 }}>
                  <CircularProgress
                    size={26}
                    sx={{ color: "var(--rose-dark)" }}
                  />
                  <Typography
                    sx={{ mt: 1, color: "var(--muted)", fontSize: 12 }}
                  >
                    Загружаем мастеров...
                  </Typography>
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Не удалось получить данные.
                </TableCell>
              </TableRow>
            ) : items.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  Мастера не найдены.
                </TableCell>
              </TableRow>
            ) : (
              items.map((master) => (
                <TableRow key={master.id} hover>
                  <TableCell sx={{ minWidth: 205 }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
                      <Box
                        component="img"
                        src={master.avatar}
                        alt=""
                        sx={{
                          width: 44,
                          height: 44,
                          flexShrink: 0,
                          borderRadius: "50%",
                          objectFit: "cover",
                          backgroundColor: "var(--rose-pale)",
                        }}
                      />

                      <Box>
                        <Typography sx={{ fontSize: 12, fontWeight: 700 }}>
                          {master.name}
                        </Typography>
                        <Typography sx={{ mt: 0.3, color: "var(--muted)", fontSize: 10 }}>
                          ID: {master.id}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>

                  <TableCell sx={{ whiteSpace: "nowrap" }}>
                    {master.district}
                  </TableCell>

                  <TableCell sx={{ minWidth: 170 }}>
                    <Box sx={{ display: "flex", flexWrap: "wrap", gap: 0.6 }}>
                      {master.styleTags.length > 0 ? (
                        master.styleTags.map((tag) => (
                          <Chip
                            key={tag}
                            label={tag}
                            size="small"
                            variant="outlined"
                            sx={{
                              height: 24,
                              borderColor: "#e7cdd4",
                              borderRadius: "2px",
                              color: "var(--rose-dark)",
                              backgroundColor: "#fbf2f4",
                              "& .MuiChip-label": {
                                px: 1,
                                fontSize: 10,
                              },
                            }}
                          />
                        ))
                      ) : (
                        <Typography sx={{ color: "var(--muted)", fontSize: 11 }}>
                          Не указано
                        </Typography>
                      )}
                    </Box>
                  </TableCell>

                  <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                    <Typography sx={{ color: "var(--rose-dark)", fontSize: 12, fontWeight: 700 }}>
                      ★ {master.rating.toFixed(1)}
                    </Typography>
                    <Typography sx={{ mt: 0.3, color: "var(--muted)", fontSize: 10 }}>
                      {master.reviewCount} отзывов
                    </Typography>
                  </TableCell>

                  <TableCell>
                    <Chip
                      label={STATUS_LABEL[master.status]}
                      color={STATUS_COLOR[master.status]}
                      size="small"
                      sx={{
                        borderRadius: "2px",
                        fontSize: 10,
                        fontWeight: 600,
                        "&.MuiChip-colorSuccess": {
                          color: "#477356",
                          backgroundColor: "#e5f0e8",
                        },
                      }}
                    />
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        <TablePagination
          component="div"
          count={total}
          page={page - 1}
          onPageChange={(_, newPage) => setPage(newPage + 1)}
          rowsPerPage={PAGE_SIZE}
          onRowsPerPageChange={() => undefined}
          rowsPerPageOptions={[PAGE_SIZE]}
          labelRowsPerPage="Мастеров на странице:"
          labelDisplayedRows={({ from, to, count }) =>
            `${from}–${to} из ${count}`
          }
          sx={{
            borderTop: "1px solid var(--line)",
            backgroundColor: "#fffaf8",
            color: "var(--muted)",
            "& .MuiTablePagination-toolbar": {
              minHeight: 58,
              flexWrap: "wrap",
              px: { xs: 1, sm: 2 },
            },
            "& .MuiTablePagination-selectLabel, & .MuiTablePagination-displayedRows": {
              fontFamily: "Manrope, Arial, sans-serif",
              fontSize: 11,
            },
            "& .MuiTablePagination-actions button": {
              color: "var(--rose-dark)",
            },
          }}
        />
      </TableContainer>
    </Box>
  );
}